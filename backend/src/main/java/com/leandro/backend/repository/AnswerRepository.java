package com.leandro.backend.repository;

import java.util.List;

import com.leandro.backend.models.Answer;
import com.leandro.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, String> {

    @Modifying
    @Query("update Answer a set a.content = :content where a.id = :id")
    void updateContentAnswer(@Param(value = "id") String id, @Param(value = "content") String content);

    public List<Answer> findAllByIdUserAnswer(User idUserAnswer);

    public void deleteAllByIdUserAnswer(String idUserAnswer);

}
