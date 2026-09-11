package studentmanager;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")


@SpringBootApplication
public class StudentApplication {
	
	public static void main(String[] args) {
		SpringApplication.run(StudentApplication.class, args);
		System.out.print("hello");
	}
    // // API Hello
    // // URL: http://localhost:8080/api/hello
    @GetMapping("/hello")
    public String hello() {
        return "Hello Spring Boot API";
    }

    // API student + id
    // URL:  http://localhost:8080/api/student/10
    @GetMapping("/student/{id}")
    public String getStudent(@PathVariable int id) {
        return "Sinh viên có mã: " + id;
    }

    // API student + name
    // URL: http://localhost:8080/api/student?name=Nam
    @GetMapping("/student")
    public String greet(@RequestParam String name) {
        return "Xin chào " + name;
    }

    // API name + age
    // URL: http://localhost:8080/api/searchStudent?name=Son&age=20
    @GetMapping("/searchStudent")
    public String searchStudent(@RequestParam String name,
                                @RequestParam(defaultValue = "1") int age) {
                                    return "Tên=" + name + ", tuổi=" + age;
                                } 
    
    // Trả về JSON Objeact
    // URL: http://localhost:8080/api/students
    // @GetMapping("/students")
    // public Student getStudent () {
    //     return new Student(1, "Trần Thị Lệ ", 20);
    // }

    // // Trả về danh sách
    // //URL: // URL: http://localhost:8080/api/studentall
    // @GetMapping("/studentall")
    // public List<Student> getStudents() {
    //     List<Student> list = new ArrayList<>();
    //     list.add(new Student(1, "Quỳnh",20));
    //     list.add(new Student(2, "Sơn", 20));
    //     list.add(new Student(3, "Trang", 20));
    //     return list;
    // }

    // // ResquesHeader
    // // URL: http://localhost/8080/api/getstudent
    // @GetMapping("/getstudent")
    // public  String getStudents(
    //     @RequestHeader("Authorization") String authorization) {
    //         return "Authorization = " + authorization;
    //     }
}
