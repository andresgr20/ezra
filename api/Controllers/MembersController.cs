using System;
using System.Collections.Generic;

using EzraTest.DB;
using EzraTest.Models;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EzraTest.Controllers
{
    [ApiController]
    [Route("members")]
    public class MembersController : ControllerBase
    {
        private readonly IMembersRepository _membersRepository;

        public MembersController()
        {
            _membersRepository = new MembersRepository("app.db");
        }

        [HttpGet]
        [Route("")]
        public IEnumerable<Member> GetAllMembers()
        {
            return _membersRepository.GetMembers();
        }

        [HttpGet]
        [Route("{id}")]
        public Member GetMember(Guid id)
        {
            return _membersRepository.GetMember(id);
        }

        [HttpPost]
        [Route("add")]
        public void AddMember(Member member)
        {
            member.Id = Guid.NewGuid();
            _membersRepository.AddMember(member);
        }

        [HttpPost]
        [Route("edit/{id}")]
        public void UpdateMember(Guid id, Member member)
        {
            member.Id= id;
            _membersRepository.UpdateMember(id, member);
        }

        // TODO
        // Choose a http method and route and complete the method
        [HttpPost]
        [Route("delete/{id}")]
        public void DeleteMember(Guid id)
        {
            Console.WriteLine(id);
            // string[] keys = Request.Form.AllKeys;
            // for (int i= 0; i < keys.Length; i++) 
            // {
            //     Console.WriteLine(keys[i] + ": " + Request.Form[keys[i]]);
            // }
            _membersRepository.DeleteMember(id);

            //send http back
        }
    }
}
