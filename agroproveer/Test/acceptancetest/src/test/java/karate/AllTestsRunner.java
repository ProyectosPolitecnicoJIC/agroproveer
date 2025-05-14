package karate;

import com.intuit.karate.Results;
import com.intuit.karate.Runner;
import net.masterthought.cucumber.Configuration;
import net.masterthought.cucumber.ReportBuilder;
import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;

import java.io.File;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

class AllTestsRunner {

    @Test
    void testParallel() {
        Results results = Runner.path("classpath:karate")
                .tags("~@ignore")
                .outputCucumberJson(true)
                .parallel(4);

        generateReport(results.getReportDir());

        if (results.getFailCount() > 0) {
            throw new AssertionError("Hubo fallos: " + results.getErrorMessages());
        }
    }

    public static void generateReport(String karateOutputPath) {
        Collection<File> jsonFiles = FileUtils.listFiles(new File(karateOutputPath), new String[]{"json"}, true);
        List<String> jsonPaths = new ArrayList<>();
        for (File file : jsonFiles) {
            jsonPaths.add(file.getAbsolutePath());
        }

        Configuration config = new Configuration(new File("target"), "Karate Test Suite");
        ReportBuilder reportBuilder = new ReportBuilder(jsonPaths, config);
        reportBuilder.generateReports();
    }
}
