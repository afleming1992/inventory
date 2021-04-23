package me.ajfleming.inventory.socket.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import me.ajfleming.inventory.model.ItemPlayerView;
import me.ajfleming.inventory.model.RolePlayerView;

@Data
@AllArgsConstructor
public class ItemEvent {
  private RolePlayerView role;
  private ItemPlayerView item;
}
