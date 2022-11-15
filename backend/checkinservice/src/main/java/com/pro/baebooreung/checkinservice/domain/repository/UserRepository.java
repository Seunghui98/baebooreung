package com.pro.baebooreung.checkinservice.domain.repository;

import com.pro.baebooreung.checkinservice.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Repository
@RequiredArgsConstructor
@Transactional
public class UserRepository {
    @PersistenceContext
    private final EntityManager em;

    public User findOne(int user_id){
        User findUser = em.find(User.class, user_id);
        return findUser;
    }

    public void save(User user){
        em.persist(user);
    }
}
