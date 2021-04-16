package me.ajfleming.inventory.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
  @OneToMany
  @Builder.Default
  @JsonIgnore
  private List<Item> itemsList = new ArrayList<>();

  public void updateRole(Role updatedRole) {
    this.roleName = new NullCheck<String>().check(updatedRole.getRoleName(), roleName);
    this.hidden = new NullCheck<Boolean>().check(updatedRole.isHidden(), hidden);
  }

  public void addItem(Item item) {
    itemsList.add(item);
  }

  public List<Item> getVisibleItemsList() {
    return this.itemsList.stream().filter(item -> !item.isHidden()).toList();
  }

  public Optional<Item> findItemById(long itemId, boolean excludeHidden){
    Stream<Item> itemStream = itemsList.stream().filter(item -> item.getId().equals(itemId));
    if (excludeHidden) {
      itemStream = itemStream.filter(item -> !item.isHidden());
    }
    return itemStream.findFirst();
  }

  public static class RoleBuilder {
    public RoleBuilder newRole() {
      this.joinCode = JoinCodeGenerator.generateJoinCode();
      return this;
    }
  }
}
