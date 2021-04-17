package me.ajfleming.inventory.socket.event;

import lombok.Data;

@Data
public class LoginEvent {
  private String hostKey;
  private String joinCode;
}
