package me.ajfleming.inventory.model;

import java.util.List;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RolePlayerView {
  private long id;
  private String name;
  private List<ItemPlayerView> items;
}
