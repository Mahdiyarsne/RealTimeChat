
using Api.Hubs;
using Api.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;

internal class Program
{
	private static void Main(string[] args)
	{
		var builder = WebApplication.CreateBuilder(args);

		// Add services to the container.

		builder.Services.AddControllers();
		// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
		builder.Services.AddEndpointsApiExplorer();
		builder.Services.AddSingleton<ChatService>();
		builder.Services.AddSignalR();
	
		builder.Services.AddCors();	
		var app = builder.Build();
			
		// Configure the HTTP request pipeline.
		app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:4200"));

		app.UseHttpsRedirection();

		app.UseAuthorization();

		app.MapControllers();

		app.MapHub<ChatHub>("/hubs/chat");

		app.Run();
	}
}