package com.leandro.backend.controllers;

import com.leandro.backend.models.Response;
import com.leandro.backend.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @RequestMapping(value = "api/response/create/questionId/{id}", method = RequestMethod.POST)
    public Response createResponse(@RequestBody Response response, @PathVariable String id){
        return responseService.createResponseToQuestion(response, id);
    }

    @RequestMapping(value = "api/response", method = RequestMethod.GET)
    public List<Response> getAllResponse(){
        return responseService.getAllResponse();
    }

    @RequestMapping(value = "api/response/{id}", method = RequestMethod.GET)
    public Response getResponse(@PathVariable String id){
        return responseService.getResponseToQuestion(id);
    }

    @RequestMapping(value = "api/response/{id}", method = RequestMethod.POST)
    public Response modifyResponse(@PathVariable String id, @RequestBody String content){
        return responseService.modifyResponse(id, content);
    }

    @RequestMapping(value = "api/response/{id}", method = RequestMethod.DELETE)
    public String deleteResponse(@PathVariable String id){
        return responseService.deleteResponse(id);
    }

}
