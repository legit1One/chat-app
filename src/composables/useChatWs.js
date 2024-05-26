import {onBeforeMount, ref} from "vue";
import {APP_THEME, WS_MESSAGE_TYPE} from "@/static/common.js";

export function useChatWs() {
    const socket = new WebSocket('wss://echo.websocket.org/');
    const messages = ref([])
    const theme = ref(APP_THEME.DEFAULT)

    function sendMessage (value, type) {
        if(type === WS_MESSAGE_TYPE.CHAT) {
            messages.value.push({ text: value })
        } else if(value === theme.value) return

        socket.send(JSON.stringify({ value, type }))
    }

    onBeforeMount(() => {
        // sending heartbeat every 5s to keep connection opened
        socket.addEventListener("open", (event) => {
            setInterval(() => {
                socket.send("heartbeat");
            }, 5000);
        });

        socket.onmessage = function({ data }) {
            try {
                const response = JSON.parse(data)

                if(response.type === WS_MESSAGE_TYPE.THEME) {
                    theme.value = response.value
                    const html = document.querySelector('html')
                    html.classList.remove(...html.classList)
                    html.classList.add(response.value)
                } else {
                    messages.value.push({ text: response.value, isRightAligned: true })
                }
            } catch (e) {
                // prevent error message if server message is not JSON
                if(e instanceof SyntaxError) return
                console.error(e)
            }
        };

        socket.onclose = function(event) {
            if (!event.wasClean) {
                alert('Соединение прервано');
            }
        };

        socket.onerror = function(error) {
            alert('Ошибка соеденения');
        };
    })

    return {
        sendMessage,
        messages,
        theme
    }
}