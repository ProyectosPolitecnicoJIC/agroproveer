package karate;

import com.intuit.karate.junit5.Karate;

public class CategoriaRunner {

    @Karate.Test
    Karate categoria() {
        return Karate.run("categoria").relativeTo(getClass());
    }
}
