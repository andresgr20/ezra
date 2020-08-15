using System;
using System.Collections.Generic;
using System.Linq;

using EzraTest.Models;

using Microsoft.Data.Sqlite;

namespace EzraTest.DB
{
    public class MembersRepository : IMembersRepository
    {
        private string _connectionString;

        public MembersRepository(string connectionString)
        {
            _connectionString = $"Data Source={connectionString}";
        }

        /// <inheritdoc />
        public IEnumerable<Member> GetMembers()
        {
            return ExecuteQuery("SELECT * FROM MEMBERS", (reader) =>
            {
                return new Member
                {
                    Id = reader.GetGuid(0),
                    Name = reader.GetString(1),
                    Email = reader.GetString(2)
                };
            });
        }

        /// <inheritdoc />
        public Member GetMember(Guid id)
        {
            return ExecuteQuery($"SELECT * FROM MEMBERS WHERE Id = '{id:N}'", (reader) =>
            {
                return new Member
                {
                    Id = Guid.Parse(reader.GetString(0)),
                    Name = reader.GetString(1),
                    Email = reader.GetString(2)
                };
            }).FirstOrDefault();
        }

        /// <inheritdoc />
        public void AddMember(Member member)
        {
            // adds the member to the table
            // ExecuteQuery($"INSERT INTO MEMBERS(ID,NAME,EMAIL) VALUES('{member.Id}','{member.Name}','{member.Email}')");
            throw new NotImplementedException();
        }

        /// <inheritdoc />
        public void UpdateMember(Guid id, Member member)
        {
            // update all the member instead of checking all the info
            // ExecuteQuery($"UPDATE MEMBERS SET NAME='{member.Name}', EMAIL='{member.Email}' WHERE ID='{id}'");
            throw new NotImplementedException();
        }

        /// <inheritdoc />
        public void DeleteMember(Guid id)
        {
            // Deletes the member based on the primary key
            // ExecuteQuery($"DELETE FROM MEMBERS WHERE ID='{id}'");
            throw new NotImplementedException();
        }

        private IEnumerable<T> ExecuteQuery<T>(string commandText, Func<SqliteDataReader, T> func)
        {
            using (var connection = new SqliteConnection(_connectionString))
            {
                connection.Open();

                var command = connection.CreateCommand();
                command.CommandText = commandText;

                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        yield return func(reader);
                    }
                }
            }
        }
    }
}