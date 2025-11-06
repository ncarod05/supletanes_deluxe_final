package cl.supletanes.supletanes_deluxe;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test") // Esto carga la configuración de application-test.properties
class SupletanesDeluxeApplicationTests {
	@Test
	void contextLoads() {
	}
}
