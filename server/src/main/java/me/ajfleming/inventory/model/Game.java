package me.ajfleming.inventory.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@Entity
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Game {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;
  private String hostKey;
  @OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
  @EqualsAndHashCode.Exclude @ToString.Exclude
  private List<Role> roles = new ArrayList<>();

  public void addRole(Role role) {
    roles.add(role);
  }

  public Optional<Role> findRoleById(long id, boolean excludeHidden) {
    Stream<Role> roleStream = roles.stream().filter(role -> role.getId().equals(id));
    if(excludeHidden) {
      roleStream = roleStream.filter(role -> !role.isHidden());
    }
    return roleStream.findFirst();
  }

  public Optional<Role> findRoleByJoinCode(String joinCode) {
    return roles.stream().filter(role -> role.getJoinCode().equals(joinCode)).findFirst();
  }

  @JsonIgnore
  public List<Role> getVisibleRoles() {
    return roles.stream().filter(role -> !role.isHidden()).toList();
  }

  public static class GameBuilder {
    public GameBuilder newGame() {
       this.hostKey = UUID.randomUUID().toString();
      return this;
    }
  }
}
