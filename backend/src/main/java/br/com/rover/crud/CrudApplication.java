package br.com.rover.crud;

import org.springframework.boot.Banner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/application.properties")
@ComponentScan(basePackages = {"br.com.rover.crud"})
public class CrudApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

	private static SpringApplicationBuilder configureApplication(SpringApplicationBuilder builder){
		return builder.sources(CrudApplication.class).bannerMode(Banner.Mode.CONSOLE);
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder){
		return configureApplication(builder);
	}
}
