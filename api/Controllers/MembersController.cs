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
            Response.StatusCode = 200;
            try{
                var addr = new System.Net.Mail.MailAddress(member.Email);
                if(addr.Address == member.Email){
                    member.Id = Guid.NewGuid();
                    _membersRepository.AddMember(member);
                }              
            }catch{
                // Not a valid email
                Response.StatusCode = 930;
            }
        }

        [HttpPost]
        [Route("edit/{id}")]
        public void UpdateMember(Guid id, Member member)
        {
            member.Id= id;
            Response.StatusCode = 200;
            try{
                var addr = new System.Net.Mail.MailAddress(member.Email);
                if(addr.Address == member.Email){
                    _membersRepository.UpdateMember(id, member);
                }              
            }catch{
                // Not a valid email
                Response.StatusCode = 930;
            }
        }

        // TODO
        // Choose a http method and route and complete the method
        [HttpPost]
        [Route("delete/{id}")]
        public void DeleteMember(Guid id)
        {
            Response.StatusCode = 200;
            _membersRepository.DeleteMember(id);
        }
    }

}
