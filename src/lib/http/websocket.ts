import { api } from "./https";
import { urls } from "./settings";


export class AppWebSocket {
	client: WebSocket;
	handlers: { [key: string]: (data: any) => void };

	constructor() {
		this.client = new WebSocket(urls.wsBase as string);
		this.handlers = {};
		this.listen();
	}

	async bind(client_id: string) {
		return api.post('/dapp/websocket/bind', { data: { client_id } });
	}

	listen() {
		this.client.onmessage = async (e) => {
			try {
				const message = JSON.parse(e.data);
				console.log(message);
				if (this.handlers[message.type]) {
					this.handlers[message.type](message.data);
				} else if (message.type === 'ping') {
					null;
				} else {
					console.warn(`No handler for topic: ${message.type}`);
				}
			} catch (error) {
				throw new Error(`Failed to listen on websocket: ${error}`);
			}
		};
	}

	on(topic: string, handler: (data: any) => void) {
		this.handlers[topic] = handler;
	}

	close() {
		this.client.close();
	}
}

export let WebSocketService: AppWebSocket;

export async function initializedWebsocket() {
	WebSocketService = new AppWebSocket();
	if (WebSocketService !== undefined) {
		WebSocketService.on('clientId', async (data) => {
			await WebSocketService.bind(data);
		});
	}
}
