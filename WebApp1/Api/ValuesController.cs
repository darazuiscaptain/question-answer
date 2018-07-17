using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;

namespace WebApp1.Api
{
    
    [Produces("application/json")]
    [Route("api/questions")]
    public class ValuesController : Controller
    {
        //string cs =  @"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True";
        SqlConnection con = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True");

        // GET: api/Values
        [HttpGet]
        public JsonResult Get()
        {
            Status status = new Status();
            List<Question> arr = new List<Question>();
            con.Open();
            Question question = new Question();
            SqlCommand cmd = new SqlCommand("select * from Questions Order by Id Desc", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.HasRows && reader.Read())
            {
                question.Id = reader.GetInt32(0);
                question.Title = reader.GetValue(1).ToString();
                question.Body = reader.GetValue(2).ToString();
                question.Time = reader.GetValue(3).ToString();
                question.userId = reader.GetInt32(4);
                question.vote = reader.GetInt32(5);

                arr.Add(question);
            }
            status.StatusValue = true;
            status.Data = arr;
            return Json(status);
        }

        [Route("trend")]
        [HttpGet]
        public JsonResult Trend()
        {
            Status status = new Status();
            List<Question> arr = new List<Question>();
            con.Open();
            Question question = new Question();
            SqlCommand cmd = new SqlCommand("select Id, Title, Body, Time, userId, vote, count(questionId) from Questions natural join Answers", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.HasRows && reader.Read())
            {
                question.Id = reader.GetInt32(0);
                question.Title = reader.GetValue(1).ToString();
                question.Body = reader.GetValue(2).ToString();
                question.Time = reader.GetValue(3).ToString();
                question.userId = reader.GetInt32(4);
                question.vote = reader.GetInt32(5);

                arr.Add(question);
            }
            status.StatusValue = true;
            status.Data = arr;
            return Json(status);
        }

        // GET: api/Values/5
        [HttpGet("{id}", Name = "Get")]
        public JsonResult Get(int id)
        {
            Status status = new Status();
            List<Answers> arr = new List<Answers>();
            con.Open();
            Answers question = new Answers();
            SqlCommand cmd = new SqlCommand("select * from Answers where questionId="+id+" Order by vote ASC", con);
            SqlDataReader reader = cmd.ExecuteReader();
            while (reader.HasRows && reader.Read())
            {
                question.Id = reader.GetInt32(0);
                question.Answer = reader.GetValue(1).ToString();
                question.Time = reader.GetValue(2).ToString();
                question.userId = reader.GetInt32(3);
                question.questionId = reader.GetInt32(4);
                question.vote = reader.GetInt32(5);

                arr.Add(question);
            }
            status.StatusValue = true;
            status.Data = arr;
            return Json(status);
        }
        
        // POST: api/Values
        [HttpPost]
        public JsonResult Post([FromBody]Question value)
        {
            Status status = new Status();
            con.Open();
            SqlCommand cmd = new SqlCommand("insert Questions (Title, Body, Time, userId, vote) values ('"+value.Title+"', '"+value.Body+"', '"+value.Time+"', "+value.userId+", "+value.vote+")", con);
            status.StatusValue = false;
            int r = cmd.ExecuteNonQuery();
            if (r == 1)
                status.StatusValue = true;

            return Json(status);
        }

        [Route("vote")]
        [HttpPost]
        public JsonResult Vote([FromBody]Question value)
        {
            Status status = new Status();
            con.Open();
            int vote = value.vote + 1;
            SqlCommand cmd = new SqlCommand("update Questions set vote=" + vote + " where Id="+value.Id, con);
            status.StatusValue = false;
            int r = cmd.ExecuteNonQuery();
            if (r == 1)
                status.StatusValue = true;

            return Json(status);
        }

        // PUT: api/Values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

}
