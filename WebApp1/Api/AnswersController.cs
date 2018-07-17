using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Data.SqlClient;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp1.Api
{
    [Route("api/[controller]")]
    public class AnswersController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }



        SqlConnection con = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=master;Integrated Security=True");

        // GET: api/Values


        // GET: api/Values/5
        [HttpGet("{id}", Name = "GetAnswers")]
        public JsonResult GetAnswers(int id)
        {
            Status status = new Status();
            List<Answers> arr = new List<Answers>();
            con.Open();
            Answers question = new Answers();
            SqlCommand cmd = new SqlCommand("select * from Answers where userId=" + id + " Order by vote ASC", con);
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

        [Route("vote")]
        [HttpPost]
        public JsonResult Vote([FromBody]Question value)
        {
            Status status = new Status();
            con.Open();
            int vote = value.vote + 1;
            SqlCommand cmd = new SqlCommand("update Answers set vote=" + vote + " where Id=" + value.Id, con);
            status.StatusValue = false;
            int r = cmd.ExecuteNonQuery();
            if (r == 1)
                status.StatusValue = true;

            return Json(status);
        }

        // POST: api/Values
        [HttpPost]
        public JsonResult Post([FromBody]Answers value)
        {
            Status status = new Status();
            try
            {
                con.Open();
                SqlCommand cmd = new SqlCommand("insert Answers (Answer, Time, userId, questionId, vote) values ('" + value.Answer + "', '" + value.Time + "', " + value.userId + ", " + value.questionId + ", " + value.vote + ")", con);
                status.StatusValue = false;
                int r = cmd.ExecuteNonQuery();
                if (r == 1)
                    status.StatusValue = true;
            } catch(Exception e)
            {
                status.StatusValue = false;
                status.Data = e.Message;
                return Json(status);
            }

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
}
