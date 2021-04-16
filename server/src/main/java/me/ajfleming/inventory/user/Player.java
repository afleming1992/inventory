package me.ajfleming.inventory.user;

import com.corundumstudio.socketio.SocketIOClient;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Player {
  private SocketIOClient socketIOClient;
  private long gameId;
  private long roleId;
}
