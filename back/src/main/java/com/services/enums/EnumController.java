package com.services.enums;

import com.services.system.Result;
import com.services.system.StatusCode;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/enums")
public class EnumController {

    @GetMapping("/roles")
    public Result getRoles() {
        Map<String, String> res = new HashMap<>();
        for (Role i : Role.values()) res.put(i.name(), i.getName());
        return new Result(
                true,
                StatusCode.SUCCESS,
                "Roles",
                res
        );
    }
}
