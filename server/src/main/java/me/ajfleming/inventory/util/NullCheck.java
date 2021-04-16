package me.ajfleming.inventory.util;

public class NullCheck<T> {
  public T check(T checkValue, T valueIfNull) {
    return checkValue != null ? checkValue : valueIfNull;
  }
}
