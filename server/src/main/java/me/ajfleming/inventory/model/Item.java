package me.ajfleming.inventory.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.ajfleming.inventory.util.NullCheck;

@Data
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Item {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String name;
  private String imageUrl;
  private String description;
  private Integer maxUsages;
  private Integer usagesLeft;
  @Builder.Default
  private boolean swapable = true;
  @Builder.Default
  private boolean hidden = true;
  @ManyToOne
  @JsonIgnore
  private Role itemOwner;

  public Item updateItem(Item updatedItem) {
    this.name = new NullCheck<String>().check(updatedItem.getName(), name);
    this.imageUrl = new NullCheck<String>().check(updatedItem.getImageUrl(), imageUrl);
    this.description = new NullCheck<String>().check(updatedItem.getDescription(), description);
    this.maxUsages = new NullCheck<Integer>().check(updatedItem.getMaxUsages(), maxUsages);
    this.usagesLeft = new NullCheck<Integer>().check(updatedItem.getUsagesLeft(), usagesLeft);
    this.swapable = new NullCheck<Boolean>().check(updatedItem.isSwapable(), swapable);
    this.hidden = new NullCheck<Boolean>().check(updatedItem.isHidden(), hidden);
    return this;
  }

  public void useItem() {
    if(maxUsages != null && usagesLeft != null && maxUsages > usagesLeft) {
      usagesLeft--;
    }
  }
}
