package pl.github.agpaluch.lang;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LangRepository extends JpaRepository<Lang, Integer> {

    List<Lang> findByCode(String code);

}
