package api;

import com.uwetrottmann.tmdb2.entities.Genre;
import domain.model.MovieDisplayInfo;
import domain.model.MovieSuggestionInfo;
import domain.service.MovieRequester;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@ApplicationScoped // singleton
@Path("/movies")
public class MovieRestService {
    private final MovieRequester movieRequester;

    public MovieRestService() {
        this.movieRequester = new MovieRequester();
    }

    @GET
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getDisplayInfo(@PathParam("id") int id) {

        MovieDisplayInfo displayInfo = movieRequester.getDisplayInfo(id);

        if (displayInfo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(displayInfo).build();
    }

    @GET
    @Path("/suggestion-info/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getSuggestionInfo(@PathParam("id") int id) {

        MovieSuggestionInfo suggestionInfoInfo = movieRequester.getSuggestionInfo(id);

        if (suggestionInfoInfo == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(suggestionInfoInfo).build();
    }

    @GET
    @Path("/genres")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getGenres() {

        List<Genre> genres = movieRequester.getGenres();

        if (genres == null) {
            return Response.status(Response.Status.NOT_FOUND).build();
        }

        return Response.ok(genres).build();
    }

}
