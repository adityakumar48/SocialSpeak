import freeice from "freeice";
import { useCallback, useEffect, useRef } from "react";
import { ACTIONS } from "../actions";
import { socketInit } from "../socket/index";
import { useStateWithCallback } from "./useStateWithCallback";

export const useWebRTC = (roomId: string | undefined, user: object | null) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const socket = useRef(null);
  const localMediaStream = useRef(null);
  const clientsRef = useRef(null);

  const addNewClient = useCallback(
    (newClient: { id: string }, cb: () => void) => {
      const lookingFor = clients.find(
        (client: { id: string }) => client.id === newClient.id
      );

      if (lookingFor === undefined) {
        setClients(
          (existingClients: never) => [...existingClients, newClient],
          cb
        );
      }
    },
    [clients, setClients]
  );

  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  useEffect(() => {
    const initChat = async () => {
      // @ts-ignore
      socket.current = socketInit();
      await captureMedia();
      addNewClient(
        { ...user, muted: true } as { id: string; muted: boolean },
        () => {
          // @ts-ignore
          const localElement = audioElements.current[user.id];
          if (localElement) {
            localElement.volume = 0;
            localElement.srcObject = localMediaStream.current;
          }
        }
      );
      // @ts-ignore
      socket.current.on(
        // @ts-ignore
        ACTIONS.MUTE_INFO,
        ({ userId, isMute }: { userId: string; isMute: boolean }) => {
          handleSetMute(isMute, userId);
        }
      );
      // @ts-ignore
      socket.current.on(ACTIONS.ADD_PEER, handleNewPeer);
      // @ts-ignore
      socket.current.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
      // @ts-ignore
      socket.current.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
      // @ts-ignore
      socket.current.on(ACTIONS.SESSION_DESCRIPTION, setRemoteMedia);
      // @ts-ignore
      socket.current.on(ACTIONS.MUTE, ({ peerId, userId }) => {
        handleSetMute(true, userId);
      });
      // @ts-ignore
      socket.current.on(ACTIONS.UNMUTE, ({ peerId, userId }) => {
        handleSetUnMute(false, userId);
      });
      // @ts-ignore
      socket.current.emit(ACTIONS.JOIN, {
        roomId,
        user,
      });

      async function captureMedia() {
        // Start capturing local audio stream.
        // @ts-ignore
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
      }
      // @ts-ignore
      async function handleNewPeer({ peerId, createOffer, user: remoteUser }) {
        if (peerId in connections.current) {
          return console.warn(
            // @ts-ignore
            `You are already connected with ${peerId} (${user.name})`
          );
        }

        // Store it to connections
        // @ts-ignore
        connections.current[peerId] = new RTCPeerConnection({
          iceServers: freeice(),
        });

        // Handle new ice candidate on this peer connection
        // @ts-ignore
        connections.current[peerId].onicecandidate = (event: {
          // @ts-ignore
          candidate;
        }) => {
          // @ts-ignore
          socket.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            icecandidate: event.candidate,
          });
        };

        // Handle on track event on this connection
        // @ts-ignore
        connections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
          addNewClient({ ...remoteUser, muted: true }, () => {
            // get current users mute info
            // @ts-ignore
            const currentUser = clientsRef.current.find(
              // @ts-ignore
              (client) => client.id === user.id
            );
            if (currentUser) {
              // @ts-ignore
              socket.current.emit(ACTIONS.MUTE_INFO, {
                // @ts-ignore
                userId: user.id,
                roomId,
                isMute: currentUser.muted,
              });
            }
            // @ts-ignore
            if (audioElements.current[remoteUser.id]) {
              // @ts-ignore
              audioElements.current[remoteUser.id].srcObject = remoteStream;
            } else {
              let settled = false;
              const interval = setInterval(() => {
                // @ts-ignore
                if (audioElements.current[remoteUser.id]) {
                  // @ts-ignore
                  audioElements.current[remoteUser.id].srcObject = remoteStream;
                  settled = true;
                }

                if (settled) {
                  clearInterval(interval);
                }
              }, 300);
            }
          });
        };

        // Add connection to peer connections track
        // @ts-ignore
        localMediaStream.current.getTracks().forEach((track) => {
          // @ts-ignore
          connections.current[peerId].addTrack(track, localMediaStream.current);
        });

        // Create an offer if required
        if (createOffer) {
          // @ts-ignore
          const offer = await connections.current[peerId].createOffer();

          // Set as local description
          // @ts-ignore
          await connections.current[peerId].setLocalDescription(offer);

          // send offer to the server
          // @ts-ignore
          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: offer,
          });
        }
      }
      // @ts-ignore
      async function handleRemovePeer({ peerId, userId }) {
        // Correction: peerID to
        // @ts-ignore
        if (connections.current[peerId]) {
          // @ts-ignore
          connections.current[peerId].close();
        }
        // @ts-ignore
        delete connections.current[peerId];
        // @ts-ignore
        delete audioElements.current[peerId];
        // @ts-ignore
        setClients((list) =>
          // @ts-ignore
          list.filter((c) => c.id !== userId)
        );
      }
      // @ts-ignore
      async function handleIceCandidate({ peerId, icecandidate }) {
        // @ts-ignore
        if (await icecandidate) {
          // @ts-ignore
          await connections.current[peerId]?.addIceCandidate(icecandidate);
        }
      }
      async function setRemoteMedia({
        // @ts-ignore
        peerId,
        // @ts-ignore
        sessionDescription: remoteSessionDescription,
      }) {
        // @ts-ignore
        connections.current[peerId].setRemoteDescription(
          new RTCSessionDescription(remoteSessionDescription)
        );

        // If session descrition is offer then create an answer
        if (remoteSessionDescription.type === "offer") {
          // @ts-ignore
          const connection = connections.current[peerId];

          const answer = await connection.createAnswer();
          connection.setLocalDescription(answer);
          // @ts-ignore
          socket.current.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      }
      async function handleSetMute(mute: boolean, userId: string) {
        console.log("mute", mute, userId);
        // @ts-ignore
        const clientIdx = clientsRef.current
          .map((client: { id: string }) => client.id)
          .indexOf(userId);
        const allConnectedClients = JSON.parse(
          JSON.stringify(clientsRef.current)
        );
        if (clientIdx > -1) {
          allConnectedClients[clientIdx].muted = mute;
          setClients(allConnectedClients);
        }
      }

      async function handleSetUnMute(mute: boolean, userId: string) {
        console.log("mute", mute, userId);
        // @ts-ignore
        const clientIdx = clientsRef.current
          .map((client: { id: string }) => client.id)
          .indexOf(userId);
        const allConnectedClients = JSON.parse(
          JSON.stringify(clientsRef.current)
        );
        if (clientIdx > -1) {
          allConnectedClients[clientIdx].muted = mute;
          setClients(allConnectedClients);
        }
      }
    };

    initChat();
    return () => {
      // @ts-ignore
      localMediaStream.current
        .getTracks()
        // @ts-ignore
        .forEach((track: { stop }) => track.stop());
      // @ts-ignore
      socket.current.emit(ACTIONS.LEAVE, { roomId });
      // @ts-ignore
      for (let peerId in connections.current) {
        // @ts-ignore
        connections.current[peerId].close();
        // @ts-ignore
        delete connections.current[peerId];
        // @ts-ignore
        delete audioElements.current[peerId];
      }
      // @ts-ignore
      socket.current.off(ACTIONS.ADD_PEER);
      // @ts-ignore
      socket.current.off(ACTIONS.REMOVE_PEER);
      // @ts-ignore
      socket.current.off(ACTIONS.ICE_CANDIDATE);
      // @ts-ignore
      socket.current.off(ACTIONS.SESSION_DESCRIPTION);
      // @ts-ignore
      socket.current.off(ACTIONS.MUTE);
      // @ts-ignore
      socket.current.off(ACTIONS.UNMUTE);
    };
  }, []);

  // @ts-ignore
  const provideRef = (instance, userId: string | number) => {
    // @ts-ignore
    audioElements.current[userId] = instance;
  };

  // @ts-ignore
  const handleMute = (isMute, userId) => {
    let settled = false;
    // @ts-ignore
    if (userId === user.id) {
      // @ts-ignore
      let interval = setInterval(() => {
        if (localMediaStream.current) {
          // @ts-ignore
          localMediaStream.current.getTracks()[0].enabled = !isMute;
          if (isMute) {
            // @ts-ignore
            socket.current.emit(ACTIONS.MUTE, {
              roomId,
              // @ts-ignore
              userId: user.id,
            });
          } else {
            // @ts-ignore
            socket.current.emit(ACTIONS.UNMUTE, {
              roomId,
              // @ts-ignore
              userId: user.id,
            });
          }
          settled = true;
        }
        if (settled) {
          clearInterval(interval);
        }
      }, 200);
    }
  };

  return {
    clients,
    provideRef,
    handleMute,
  };
};
