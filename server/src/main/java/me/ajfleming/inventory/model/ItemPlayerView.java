package me.ajfleming.inventory.model;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ItemPlayerView {
  private Long id;
  private String name;
  private String imageUrl;
  private String description;
  private Integer maxUsages;
  private Integer timesUsed;
  private boolean swappable;
}
