using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp1
{
    public class Answers
    {
        public int Id { get; set; }
        public string Answer { get; set; }
        public string Time { get; set; }
        public int userId { get; set; }
        public int questionId { get; set; }
        public int vote { get; set; }
    }
}
