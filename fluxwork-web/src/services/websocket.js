import SockJS from "sockjs-client/dist/sockjs";
import { Client } from "@stomp/stompjs";

let stompClient = null;

export const connectWebSocket = (onMessageReceived) => {

    const socket = new SockJS(
        "https://fluxwork-backend.onrender.com/ws"
    );

    stompClient = new Client({
        webSocketFactory: () => socket,

        reconnectDelay: 5000,

        onConnect: () => {
            console.log("WebSocket Connected");

            stompClient.subscribe(
                "/topic/tasks",
                (message) => {
                    const data = JSON.parse(message.body);

                    console.log(
                        "Task Update Received:",
                        data
                    );

                    onMessageReceived(data);
                }
            );
        },

        onStompError: (frame) => {
            console.error(
                "WebSocket Error:",
                frame
            );
        }
    });

    stompClient.activate();
};

export const disconnectWebSocket = () => {
    if (stompClient) {
        stompClient.deactivate();
    }
};