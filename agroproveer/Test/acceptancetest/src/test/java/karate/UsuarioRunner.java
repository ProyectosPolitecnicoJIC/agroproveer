package karate;

import com.intuit.karate.junit5.Karate;

public class UsuarioRunner {

    @Karate.Test
    Karate categoria() {
        return Karate.run("usuario").relativeTo(getClass());
    }
}
