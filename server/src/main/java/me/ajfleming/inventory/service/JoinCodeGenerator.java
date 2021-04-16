package me.ajfleming.inventory.service;

import java.util.Locale;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Component;

@Component
public class JoinCodeGenerator {

  public static String generateJoinCode() {
    return RandomStringUtils.randomAlphabetic(4).toUpperCase(Locale.ROOT);
  }
}
