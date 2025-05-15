package karate;

import com.intuit.karate.junit5.Karate;

public class VentaRunner {

    @Karate.Test
    Karate categoria() {
        return Karate.run("venta").relativeTo(getClass());
    }
}
