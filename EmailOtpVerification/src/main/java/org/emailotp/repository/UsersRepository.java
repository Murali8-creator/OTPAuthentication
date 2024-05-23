package org.emailotp.repository;

import org.emailotp.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {
    Users findByEmail(String email);
}
