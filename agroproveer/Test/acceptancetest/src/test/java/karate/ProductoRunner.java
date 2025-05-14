package karate;

import com.intuit.karate.junit5.Karate;

public class ProductoRunner {

    @Karate.Test
    Karate categoria() {
        return Karate.run("producto").relativeTo(getClass());
    }
}
