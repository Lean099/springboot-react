package com.leandro.backend.controllers;

import com.leandro.backend.models.Question;
import com.leandro.backend.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @RequestMapping(value = "api/question/create/userId/{idUser}", method = RequestMethod.POST)
    public Question create(@PathVariable String idUser, @RequestBody Question question) {
        return questionService.createQuestion(question, idUser);
    }

    @RequestMapping(value = "api/question", method = RequestMethod.GET)
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.GET)
    public Optional<Question> getQuestion(@PathVariable String id) {
        return questionService.findOneQuestion(id);
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.POST)
    public Optional<Question> modifyQuestion(@PathVariable String id, @RequestBody String content) {
        return questionService.modifyContentQuestion(id, content);
    }

    @RequestMapping(value = "api/question/{id}", method = RequestMethod.DELETE)
    public String deleteQuestion(@PathVariable String id) {
        return questionService.deleteQuestion(id);

    }
}
