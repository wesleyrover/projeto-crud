package br.com.rover.crud.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.EntityManagerFactoryAccessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by wesleyrover on 30/09/17.
 */
@Configuration
@EnableTransactionManagement(proxyTargetClass = true)
public class JpaConfiguration {

    @Value("${hibernate.show_sql}")
    private String showSql;

    @Value("${hibernate.format_sql}")
    private String formatSql;

    @Value("${hibernate.hbm2ddl.auto}")
    private String hbm2ddl;

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(@Autowired DataSource dataSource){
        final HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        final LocalContainerEntityManagerFactoryBean factoryBean = new LocalContainerEntityManagerFactoryBean();

        factoryBean.setPersistenceUnitName("crud");
        factoryBean.setJpaVendorAdapter(vendorAdapter);
        factoryBean.setPackagesToScan("br.com.rover.crud.domain");
        factoryBean.setDataSource(dataSource);

        final Properties properties = new Properties();
        properties.put("hibernate.show_sql",showSql);
        properties.put("hibernate.format_sql", formatSql);
        properties.put("hibernate.cache.use_second_level_cache","false");
        properties.put("hibernate.cache.use_query_cache", "false");
        properties.put("hibernate.dialect","org.hibernate.dialect.H2Dialect");
        properties.put("hibernate.hbm2ddl.auto",hbm2ddl);
        properties.put("org.hibernate.envers.revision_field_name", "ID_AUD_REVISAO");
        properties.put("org.hibernate.envers.revision_type_field_name", "FL_ACAO");
        properties.put("org.hibernate.envers.store_data_at_delete", "true");

        factoryBean.setJpaProperties(properties);

        return factoryBean;
    }

    @Bean
    public PlatformTransactionManager transactionManager(@Autowired EntityManagerFactory entityManagerFactoryAccessor){
        JpaTransactionManager jpaTransactionManager = new JpaTransactionManager();
        jpaTransactionManager.setEntityManagerFactory(entityManagerFactoryAccessor);
        return jpaTransactionManager;
    }
}
