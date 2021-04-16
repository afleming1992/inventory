package me.ajfleming.inventory.socket.action;

import lombok.Data;

@Data
public class ItemAction {
  private long gameId;
  private long recipientRoleId;
  private long itemId;
  private boolean hidden;
}
