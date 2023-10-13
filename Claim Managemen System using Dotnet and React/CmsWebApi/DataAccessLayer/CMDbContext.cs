using System;
using Microsoft.EntityFrameworkCore;
namespace CmsWebApi.DataAccessLayer
{
    public class CMDbContext: DbContext
    {
        public CMDbContext(DbContextOptions<CMDbContext> options) : base(options)
        {

        }
        public DbSet<Registration> Registrations { get; set; }
        public DbSet<Plan> Plans { get; set; }
        public DbSet<ClaimSub> Claims { get; set; }
    }
}
