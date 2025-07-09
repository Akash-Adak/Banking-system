package com.banking.user;

import java.util.Optional;

public interface UserService {
    User createUser(User user);
    Optional<User> getUserByUsername(String username);
}
