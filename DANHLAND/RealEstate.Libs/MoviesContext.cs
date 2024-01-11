using System;
using System.Collections.Generic;
using System.Linq;
using RealEstate.Entity;

using System.Data.Entity.Infrastructure;
using System.Threading.Tasks;
using System.Data.Entity;

namespace RealEstate.Libs
{
    public  class MoviesContext : RealEstateEntities
    {
        public virtual DbSet<ChangeLog> ChangeLogs { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //omitted for brevity
        }

        object GetPrimaryKeyValue(DbEntityEntry entry)
        {
            var objectStateEntry = ((IObjectContextAdapter)this).ObjectContext.ObjectStateManager.GetObjectStateEntry(entry.Entity);
            return objectStateEntry.EntityKey.EntityKeyValues[0].Value;
        }

        public override int SaveChanges()
        {
            try
            {
                //var modifiedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == System.Data.Entity.EntityState.Modified).ToList();
                var modifiedEntities = ChangeTracker.Entries().ToList();
                var now = DateTime.Now;

                foreach (var change in modifiedEntities)
                {
                    if (change.State == System.Data.Entity.EntityState.Modified)
                    {
                        var entityName = change.Entity.GetType().Name;
                        var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.OriginalValues.PropertyNames)
                        {
                            var originalValue = change.OriginalValues[prop].ToString();
                            var currentValue = change.CurrentValues[prop].ToString();
                            if (originalValue != currentValue)
                            {
                                ChangeLog log = new ChangeLog()
                                {
                                    EntityName = entityName,
                                    PrimaryKeyValue = primaryKey.ToString(),
                                    PropertyName = prop,
                                    OldValue = originalValue,
                                    NewValue = currentValue,
                                    DateChanged = now
                                };
                                ChangeLogs.Add(log);
                            }
                        }
                    }
                    else if (change.State == System.Data.Entity.EntityState.Added)
                    {
                        var entityName = change.Entity.GetType().Name;
                        //   var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.CurrentValues.PropertyNames)
                        {
                            // var originalValue = change.OriginalValues[prop].ToString();
                            var currentValue = change.CurrentValues[prop].ToString();
                            ChangeLog log = new ChangeLog()
                            {
                                EntityName = entityName,
                                PrimaryKeyValue = "",
                                PropertyName = prop,
                                OldValue = "",
                                NewValue = currentValue,
                                DateChanged = now
                            };
                            ChangeLogs.Add(log);
                        }
                    }
                    else if (change.State == System.Data.Entity.EntityState.Deleted)
                    {
                        var entityName = change.Entity.GetType().Name;
                        var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.OriginalValues.PropertyNames)
                        {
                            var originalValue = change.OriginalValues[prop].ToString();
                            // var currentValue = change.CurrentValues[prop].ToString();
                            ChangeLog log = new ChangeLog()
                            {
                                EntityName = entityName,
                                PrimaryKeyValue = primaryKey.ToString(),
                                PropertyName = prop,
                                OldValue = originalValue,
                                NewValue = "",
                                DateChanged = now
                            };
                            ChangeLogs.Add(log);
                        }
                    }

                }

                return base.SaveChanges();
            }
            catch (Exception ex)
            {
                return 0;
            }

        }
        public override Task<int> SaveChangesAsync()
        {
            try
            {
                //var modifiedEntities = ChangeTracker.Entries()
                //    .Where(p => p.State == System.Data.Entity.EntityState.Modified).ToList();
                var modifiedEntities = ChangeTracker.Entries().ToList();
                var now = DateTime.UtcNow;

                foreach (var change in modifiedEntities)
                {
                    if (change.State == System.Data.Entity.EntityState.Modified)
                    {
                        var entityName = change.Entity.GetType().Name;
                        var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.OriginalValues.PropertyNames)
                        {
                            var originalValue = change.OriginalValues[prop].ToString();
                            var currentValue = change.CurrentValues[prop].ToString();
                            if (originalValue != currentValue)
                            {
                                ChangeLog log = new ChangeLog()
                                {
                                    EntityName = entityName,
                                    PrimaryKeyValue = primaryKey.ToString(),
                                    PropertyName = prop,
                                    OldValue = originalValue,
                                    NewValue = currentValue,
                                    DateChanged = now
                                };
                                ChangeLogs.Add(log);
                            }
                        }
                    }
                    else if (change.State == System.Data.Entity.EntityState.Added)
                    {
                        var entityName = change.Entity.GetType().Name;
                        //   var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.CurrentValues.PropertyNames)
                        {
                            // var originalValue = change.OriginalValues[prop].ToString();
                            var currentValue = change.CurrentValues[prop].ToString();
                            ChangeLog log = new ChangeLog()
                            {
                                EntityName = entityName,
                                PrimaryKeyValue = "",
                                PropertyName = prop,
                                OldValue = "",
                                NewValue = currentValue,
                                DateChanged = now
                            };
                            ChangeLogs.Add(log);
                        }
                    }
                    else if (change.State == System.Data.Entity.EntityState.Deleted)
                    {
                        var entityName = change.Entity.GetType().Name;
                        var primaryKey = GetPrimaryKeyValue(change);

                        foreach (var prop in change.OriginalValues.PropertyNames)
                        {
                            var originalValue = change.OriginalValues[prop].ToString();
                            // var currentValue = change.CurrentValues[prop].ToString();
                            ChangeLog log = new ChangeLog()
                            {
                                EntityName = entityName,
                                PrimaryKeyValue = primaryKey.ToString(),
                                PropertyName = prop,
                                OldValue = originalValue,
                                NewValue = "",
                                DateChanged = now
                            };
                            ChangeLogs.Add(log);
                        }
                    }

                }
                return base.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                return Task.FromResult(0);
            }
        }
    }
    public class ChangeLog
    {
        public int Id { get; set; }
        public string EntityName { get; set; }
        public string PropertyName { get; set; }
        public string PrimaryKeyValue { get; set; }
        public string OldValue { get; set; }
        public string NewValue { get; set; }
        public DateTime DateChanged { get; set; }
    }
}