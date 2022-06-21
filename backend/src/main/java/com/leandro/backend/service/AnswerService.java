package com.leandro.backend.service;

import java.util.Date;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import javax.persistence.EntityManager;

import com.leandro.backend.models.Answer;
import com.leandro.backend.models.Question;
import com.leandro.backend.models.User;
import com.leandro.backend.repository.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AnswerService {

    @Autowired
    private AnswerRepository answerRepository;
    @Lazy
    @Autowired
    private QuestionService questionService;
    @Autowired
    private EntityManager entityManager;

    public Answer createAnswerToQuestion(Answer answer, String idQuestion, String idUser){
        answer.setIdQuestion(entityManager.getReference(Question.class, idQuestion));
        User user = entityManager.getReference(User.class, idUser);
        answer.setIdUserAnswer(user);
        answer.setDate(new Date());
        answer.setUsername(user.getUsername());
        Answer answerSaved = answerRepository.save(answer);
        questionService.modifyIdAnswer(idQuestion, answerSaved.getId());
        return answerSaved;
    }

    public List<Answer> getAllAnswer(){
        return answerRepository.findAll();
    }

    public List<Answer> getAllByIdUserAnswer(User idUserAnswer){
        return answerRepository.findAllByIdUserAnswer(idUserAnswer);
    }

    public Optional<Answer> getAnswerToQuestion(String idAnswer){
        return answerRepository.findById(idAnswer);
    }

    @Transactional
    public Optional<Answer> modifyAnswer(String idAnswer, String content){
        answerRepository.updateContentAnswer(idAnswer, content);
        return getAnswerToQuestion(idAnswer);
    }

    public String deleteAnswer(String idAnswer){
        Answer answer = getAnswerToQuestion(idAnswer).get();
        if(Objects.nonNull(questionService.findOneQuestion(answer.getIdQuestion()).get())){
            questionService.modifyIdAnswer(answer.getIdQuestion(), "");
        }
        answerRepository.deleteById(answer.getId());
        return "Answer deleted";
    }

    public void deleteAllUserAnswer(String idUser){
        List<Answer> answers = getAllByIdUserAnswer(entityManager.getReference(User.class, idUser));
        answers.forEach(answ -> {
            deleteAnswer(answ.getId());
        });
    }

}
