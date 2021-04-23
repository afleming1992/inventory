package me.ajfleming.inventory.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Stream;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import me.ajfleming.inventory.service.JoinCodeGenerator;
import me.ajfleming.inventory.util.NullCheck;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {
  @Id
  @GeneratedValue(strategy=GenerationType.AUTO)
  private Long id;
  private String roleName;
  private boolean hidden;
  private String joinCode;
  @Builder.Default
  @OneToMany(mappedBy="itemOwner", fetch=FetchType.EAGER, cascade = CascadeType.ALL)
  @JsonManagedReference
  private List<Item> items = new ArrayList<>();

  public void updateRole(Role updatedRole) {
    this.roleName = new NullCheck<String>().check(updatedRole.getRoleName(), roleName);
    this.hidden = new NullCheck<Boolean>().check(updatedRole.isHidden(), hidden);
  }

  public void addItem(Item item) {
    items.add(item);
  }

  @JsonIgnore
  public List<Item> getVisibleItemsList() {
    return this.items.stream().filter(item -> !item.isHidden()).toList();
  }

  public Optional<Item> findItemById(long itemId, boolean excludeHidden){
    Stream<Item> itemStream = items.stream().filter(item -> item.getId().equals(itemId));
    if (excludeHidden) {
      itemStream = itemStream.filter(item -> !item.isHidden());
    }
    return itemStream.findFirst();
  }

  public RolePlayerView toPlayerView(boolean includeItems) {
    RolePlayerView.RolePlayerViewBuilder builder = RolePlayerView.builder()
        .id(this.id)
        .name(this.roleName);
    if(includeItems) {
      builder.items(this.getVisibleItemsList().stream().map(Item::toPlayerView).toList());
    }
    return builder.build();
  }

  public static class RoleBuilder {
    public RoleBuilder newRole() {
      this.joinCode = JoinCodeGenerator.generateJoinCode();
      return this;
    }
  }
}
