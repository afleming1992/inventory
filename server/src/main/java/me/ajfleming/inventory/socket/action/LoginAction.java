package me.ajfleming.inventory.socket.action;

import lombok.Data;

@Data
public class LoginAction {
  private long gameId;
  private String joinCode;
}
