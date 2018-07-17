using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Data.SqlClient;
using System.Data;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp1.Api
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        // GET: api/<controller>
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}
        SqlConnection con = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True");

        // GET api/<controller>/5
        [HttpGet("{id}")]
        public JsonResult Get(int id)
        {
            Status status = new Status(); 
            UserValue userValue = new UserValue();
            UserData userData = new UserData();
            userValue.questions = new List<Question>();
            Question question = new Question();
            con.Open();
            SqlCommand cmd = new SqlCommand("select * from Questions where userId="+id, con);
            SqlCommand cmd1 = new SqlCommand("select * from users where Id=" + id, con);
            SqlDataReader reader = cmd.ExecuteReader();
            
            while (reader.HasRows && reader.Read())
            {
                question.Id = reader.GetInt32(0);
                question.Title = reader.GetValue(1).ToString();
                question.Body = reader.GetValue(2).ToString();
                question.Time = reader.GetValue(3).ToString();
                question.userId = reader.GetInt32(4);
                question.vote = reader.GetInt32(5);

                userValue.questions.Add(question);
            }
            reader.Close();
            SqlDataReader dataReader = cmd1.ExecuteReader();
            while (dataReader.HasRows && dataReader.Read())
            {
                userData.Username = dataReader.GetValue(1).ToString();
                userData.Score = dataReader.GetInt32(3);
            }
            userValue.Username = userData;
            dataReader.Close();
            status.StatusValue = true;
            status.Data = userValue;
            con.Close();
            return Json(status);
        }

        // POST api/<controller>
        [HttpPost]
        public JsonResult Post([FromBody]LoginValue value)
        {
            Status status = new Status();
            status.StatusValue = false;
            con.Open();
            if (HttpContext.Session.IsAvailable)
                return Json(status);
            SqlCommand cmd = new SqlCommand("select * from users where Email='" + value.Username + "' and Password='"+value.Password+"'", con);
            SqlDataReader reader = cmd.ExecuteReader();
            status.Data = value;
            if (reader.HasRows)
            {
                HttpContext.Session.SetString("login", "1");
                status.StatusValue = true;
            }
            con.Close();
            return Json(status);
        }

        [Route("logout")]
        [HttpPost]
        public JsonResult Logout([FromBody]LoginValue value)
        {
            Status status = new Status();
            if (HttpContext.Session.GetString("login") == "1")
            {
                HttpContext.Session.Clear();
                status.StatusValue = true;
            }

            return Json(status);
        }

        [Route("create")]
        [HttpPost]
        public JsonResult Create([FromBody]LoginValue value)
        {
                Status status = new Status();
                con.Open();
                SqlCommand cmd = new SqlCommand("INSERT users (Email, Password, Score) VALUES ('" + value.Username + "', '" + value.Password + "', 0)", con);
                int r = cmd.ExecuteNonQuery();
                status.StatusValue = false;
                if (r == 1)
                    status.StatusValue = true;

                con.Close();
                return Json(status);
        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
    public class LoginValue
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
    public class UserValue
    {
        public object Username { get; set; }
        public List<Question> questions { get; set; }
    }
    public class UserData
    {
        public string Username { get; set; }
        public int Score { get; set; }
    }
}
