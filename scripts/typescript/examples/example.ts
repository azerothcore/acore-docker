/**
 * Example with arrow function
 *
 * This is just an Hello World
 */
export const OnPlayerLogin: player_event_on_login = (event, player) => {
  player.SendChatMessageToPlayer(
    ChatMsg.CHAT_MSG_WHISPER,
    Language.LANG_UNIVERSAL,
    "Hello World",
    player
  );
};

RegisterPlayerEvent(PlayerEvents.PLAYER_EVENT_ON_LOGIN, (...args) =>
  OnPlayerLogin(...args)
);

/**
 *
 * This is an example of how to use TypeScript classes
 * and implement hook methods inside it.
 *
 * A class can be useful to implement more complex
 * scripts that can be instantiated or extended
 *
 */
export class PlayerChat {
  previousMessage: string;

  /**
   *
   * @param firstMessage The first message to display
   */
  constructor(firstMessage: string) {
    this.previousMessage = firstMessage;
  }

  OnPlayerChat: player_event_on_chat = (
    event: number,
    player: Player,
    msg: string
  ): string | boolean => {
    const sanitized = msg;

    msg = sanitized != msg ? `${sanitized} (Sanitized)` : msg;

    player.SendChatMessageToPlayer(
      ChatMsg.CHAT_MSG_WHISPER,
      Language.LANG_UNIVERSAL,
      `Previous message: ${this.previousMessage}, current message: ${msg}`,
      player
    );

    this.previousMessage = msg;

    return true;
  };
}

const playerChat = new PlayerChat("First Message");

RegisterPlayerEvent(PlayerEvents.PLAYER_EVENT_ON_CHAT, (...args) =>
  playerChat.OnPlayerChat(...args)
);
