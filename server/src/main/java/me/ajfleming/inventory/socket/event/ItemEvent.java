package me.ajfleming.inventory.socket.event;

import lombok.AllArgsConstructor;
import lombok.Data;
import me.ajfleming.inventory.model.Item;
import me.ajfleming.inventory.model.Role;

@Data
@AllArgsConstructor
public class ItemEvent {
  private Role role;
  private Item item;
}
