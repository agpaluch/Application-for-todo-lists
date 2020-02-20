package io.github.mat3e.hello.lang;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api")
class LangServlet {
    private final Logger logger = LoggerFactory.getLogger(LangServlet.class);

    private LangService langService;

    LangServlet(LangService langService) {
        this.langService = langService;
    }

    @GetMapping("/langs")
    ResponseEntity<List<LangDTO>> findAllLangs() {
        logger.info("Got request.");
        return ResponseEntity.ok(langService.findAll());
    }

}
