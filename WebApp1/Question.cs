using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp1
{
    public class Question
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public string Time { get; set; }
        public int userId { get; set; }
        public int vote { get; set; }
    }
}
