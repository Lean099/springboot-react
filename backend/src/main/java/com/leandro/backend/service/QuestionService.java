package com.leandro.backend.service;

import com.leandro.backend.models.Question;
import com.leandro.backend.repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
public class QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    public Question createQuestion(Question question, String idUser){
        question.setId_user_question(idUser);
        return questionRepository.save(question);
    }

    public List<Question> getAllQuestions(){
        return questionRepository.findAll();
    }

    public Optional<Question> findOneQuestion(String idQuestion){
        return questionRepository.findById(idQuestion);
    }

    @Transactional
    public Optional<Question> modifyContentQuestion(String idQuestion, String content){
        questionRepository.updateContentQuestion(idQuestion, content);
        return findOneQuestion(idQuestion);
    }

    public String deleteQuestion(String idQuestion){
        questionRepository.deleteById(idQuestion);
        return "Question deleted";
    }

}
