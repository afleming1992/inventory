package me.ajfleming.inventory.user;

import com.corundumstudio.socketio.SocketIOClient;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Host {
  private SocketIOClient client;
  private long gameId;
}
